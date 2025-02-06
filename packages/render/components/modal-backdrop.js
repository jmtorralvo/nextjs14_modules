"use client";

import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
	const { back } = useRouter();
	return <div className="modal-backdrop" onClick={back} onKeyDown={back} />;
}
