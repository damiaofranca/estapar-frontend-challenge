import type { ReactElement } from "react";
import { useParams } from "react-router-dom";

const GarageDetailPage = (): ReactElement => {
	const { garageId } = useParams<{ garageId: string }>();

	return (
		<div className="p-6">
			<h1 className="text-base font-semibold text-estapar-title">
				Detalhe da garagem
			</h1>
			<p className="mt-2 text-sm text-estapar-muted">ID: {garageId}</p>
		</div>
	);
};

export default GarageDetailPage;
