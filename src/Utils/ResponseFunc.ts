export const response = (status: number, message: unknown) => ({ status, message });

export const responseErro = (status:number, message: string) => ({ status, message: { message } });