import { environment } from '../../../environments/environment';

export const getFileUrl = (fileName: string): string => `${environment.baseUrl}files/${fileName}`;
