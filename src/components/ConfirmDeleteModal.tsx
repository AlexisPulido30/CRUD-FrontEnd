// components/ConfirmDeleteModal.tsx
interface ConfirmDeleteModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDeleteModal({
  open,
  title = "Confirmar eliminación",
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm p-5 bg-white rounded-lg shadow-lg">
        <h2 className="mb-3 text-lg font-semibold">{title}</h2>
        <p className="mb-6 text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-1.5 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Eliminando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
