import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDecimalsQuery, useStoreEscrowMutation, useSymbolQuery } from "../lib/queries";
import { NewEscrowInputs } from "../types/general";

interface NetworkData {
  [key: string]: number;
}


export const NewEscrow = ({ children, className }: any) => {
	const minimumEscrow = process.env.NEXT_PUBLIC_MINIMUM_ESCROW
		? Number(process.env.NEXT_PUBLIC_MINIMUM_ESCROW)
		: 0;

	const { data: decimals } = useDecimalsQuery()
	const { data: symbol } = useSymbolQuery()
		
	const { mutate: mutateStoreEscrow } = useStoreEscrowMutation()
		
	
	const networkData: NetworkData = {
			Sepoia: 11155111,
		    Fuji: 43113,
			Optimism : 420
		};

		const [selectedNetwork, setSelectedNetwork] = useState<string>(Object.keys(networkData)[0]);

		const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedNetwork = event.target.value;
			setSelectedNetwork(selectedNetwork);
		};
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<NewEscrowInputs>({
		defaultValues: {
			amount: minimumEscrow,
		},
	});
	const [amount, setAmount] = useState(minimumEscrow);
	const cAmount = useMemo(() => {
		const feeInPercent = process.env.NEXT_PUBLIC_ESCROW_FEE
			? Number(process.env.NEXT_PUBLIC_ESCROW_FEE)
			: 0;
		const fee = amount * (feeInPercent / 100);
		const amo = amount - fee;
		return { fee, escrow: amo };
	}, [amount]);

	const [newEscrowModal, setNewEscrowModal] = useState<boolean>(false);
	const [web3Loading, setWeb3Loading] = useState<boolean>(false);

	const updateInput = (e: any) => {
		setAmount(Number(e.target.value));
	};

	const onEscrowSubmit: SubmitHandler<NewEscrowInputs> = async (data) => {
		setNewEscrowModal(false);
		setWeb3Loading(true)
		mutateStoreEscrow(data, {
			onSettled: (data, error, variables, context) => {
				setWeb3Loading(false)
				reset({
					amount: minimumEscrow,
				})
			},
		})
	};

	useEffect(() => {
		if (web3Loading) {
			window.onbeforeunload = () => "Web3 transaction is running. Do you really force your browser to close?";
		} else {
			window.onbeforeunload = null
		}
	}, [web3Loading]);

	return (
		<>
			<button
				className={`btn btn-warning ${className}`}
				onClick={() => setNewEscrowModal(true)}
			>
				{children??'New Escrow'}
			</button>

			<Modal
				show={newEscrowModal}
				onHide={() => setNewEscrowModal(false)}
			>
				<Form onSubmit={handleSubmit(onEscrowSubmit)}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Escrow</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="contractTitle">
							<Form.Label>
								Contract Title{" "}
								<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Mint 1k NFT"
								{...register("contractTitle", {
									required: true,
								})}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="contractDescription"
						>
							<Form.Label>Contract Description</Form.Label>
							<Form.Control
								as="textarea"
								{...register("contractDescription")}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="sellerAddress">
							<Form.Label>
								Seller Address{" "}
								<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="0x0000000000000000000000000000000000000000"
								{...register("sellerAddress", {
									required: true,
								})}
							/>
							<Form.Text className="text-muted">
								Seller wallet address (2nd party)
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="sellerAddress">
							<Form.Label>
								Select Network{" "}
								<span className="text-danger">*</span>
							</Form.Label>
							<Form.Select
								id="networkSelector"
								onChange={handleNetworkChange}
								value={selectedNetwork}
							>
								
								 {Object.keys(networkData).map((network) => (
									<option key={network} value={network}>
										{network}
									</option>
									))}
								
							</Form.Select>
							<Form.Text className="text-muted">
										Network ID: {networkData[selectedNetwork]}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="escrowAmount">
							<Form.Label>
								Escrow Amount{" "}
								<span className="text-danger">*</span>
							</Form.Label>
							<InputGroup>
								<Form.Control
									type="number"
									min={minimumEscrow}
									step={0.0000000000000000001}
									onInput={updateInput}
									placeholder="1"
									{...register("amount", {
										required: true,
									})}
								/>
								<InputGroup.Text>{symbol}</InputGroup.Text>
							</InputGroup>
							<Form.Text className="text-muted">
								Fee: {cAmount.fee}, Escrow Amount:{" "}
								{cAmount.escrow}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="escrowExpire">
							<Form.Label>
								Expire At <span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								type="date"
								{...register("expire_at", { required: true })}
							/>
							<Form.Text className="text-muted">
								Seller can automatically claim the fund after
								expiration
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="doc">
							<Form.Label>Upload Doc</Form.Label>
							<Form.Control type="file" multiple {...register("doc")} />
							<Form.Text className="text-muted">
								Can be contract paper, NDA, any pdf, doc file
								etc
							</Form.Text>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setNewEscrowModal(false)}
						>
							Close
						</Button>
						<Button variant="success" type="submit">
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
