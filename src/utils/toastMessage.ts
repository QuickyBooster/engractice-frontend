import { Toast } from 'primereact/toast';

export const showSuccess = (toast: React.RefObject<Toast | null>, message?: string) => {
  toast?.current?.show({
    severity: 'success', 
    summary: 'Success', 
    detail: message || 'Upload new word successfully!', 
    life: 3000,
  });
}

export const showError = (toast: React.RefObject<Toast | null>, message?: string) => {
  toast?.current?.show({
    severity: 'error', 
    summary: 'Error', 
    detail: message && 'Upload new word unsuccessfully!', 
    life: 3000
  });
}
