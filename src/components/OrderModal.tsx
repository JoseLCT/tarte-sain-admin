import { useEffect, useState } from "react";
import { Order } from "../models/objects/Order";
import { OrderService } from "../services/OrderService";
interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions { }

type Props = {
    isOpen: boolean,
    handleOpen: () => void,
    orderId: number,
    onSucess: () => void
}

const defaultOrder: Order = {
    address: "",
    delivery_date: "",
    phone_number: "",
    note: "",
    total_amount: "",
    status: ""
}

const OrderModal = ({ isOpen, handleOpen, orderId, onSucess }: Props) => {
    const [order, setOrder] = useState<Order>(defaultOrder);
    const [newStatus, setNewStatus] = useState("");
    const options: DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    useEffect(() => {
        if (orderId === 0) return;
        fetchOrder();
    }, [isOpen]);

    const fetchOrder = () => {
        OrderService.get(orderId).then(response => setOrder(response));
    }

    const saveChanges = () => {
        if (newStatus === "") return;
        OrderService.changeStatus(orderId, newStatus).then(() => {
            handleOpen();
            onSucess();
        });
    }

    const getFormattedDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('es-ES', options);
    }

    return (<>
        {isOpen && (
            <div
                className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none flex items-center justify-center bg-black bg-opacity-50 dark:bg-black/50"
                id="exampleModal"
                aria-labelledby="exampleModalLabel">
                <div
                    className="pointer-events-auto relative flex w-[70vw] flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 p-4">
                        <h5
                            className="text-xl font-medium leading-normal text-surface"
                            id="exampleModalLabel">
                            Detalles de la Orden
                        </h5>
                        <button
                            id="btn-close"
                            type="button"
                            className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                            onClick={handleOpen}
                            aria-label="Close">
                            <span className="[&>svg]:h-6 [&>svg]:w-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div className="flex-auto p-4">
                        <div className="grid grid-cols-3">
                            <p><span className="font-bold">Dirección: </span>{order.address}</p>
                            <p><span className="font-bold">Fecha de Entrega: </span>
                                {getFormattedDate(order.delivery_date)}
                            </p>
                            <p><span className="font-bold">Notas: </span>{order.note}</p>
                            <p><span className="font-bold">Teléfono: </span>{order.phone_number}</p>
                            <p><span className="font-bold">Estado: </span>{order.status}</p>
                            <p><span className="font-bold">Monto Total: </span>{order.total_amount}</p>
                            <div className="col-span-3 flex justify-center py-1 gap-1">
                                <p className="font-bold">Cambiar Estado</p>
                                <select className="primary__button px-1" onChange={(e) => setNewStatus(e.target.value)} id="status">
                                    <option value="" className="text-primary" id="status-default">Sin Seleccionar</option>
                                    <option value="entregado" className="text-primary status-delivered">Entregado</option>
                                    <option value="recibido" className="text-primary status-received">Recibido</option>
                                    <option value="confirmado" className="text-primary status-confirmed">Confirmado</option>
                                    <option value="cancelado" className="text-primary status-canceled">Cancelado</option>
                                    <option value="reembolsado" className="text-primary status-refunded">Reembolsado</option>
                                    <option value="completado" className="text-primary status-completed">Completado</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 flex justify-items-center overflow-auto h-[300px] 
                            scroll-container">
                            {order.products?.map(orderProduct => (
                                <div key={orderProduct.product.id} className="border-2 p-2 rounded-md w-fit">
                                    <img src={orderProduct.product.img_url} alt={orderProduct.product.name}
                                        className="h-[200px]" />
                                    <p><span className="font-bold">Nombre: </span>{orderProduct.product.name}</p>
                                    <p><span className="font-bold">Precio: </span>{orderProduct.price}</p>
                                    <p><span className="font-bold">Cantidad: </span>{orderProduct.quantity}</p>
                                </div>))}
                        </div>
                    </div>
                    <div
                        className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 p-4">
                        <button
                            id="btn-close"
                            type="button"
                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                            onClick={handleOpen}>
                            Cerrar
                        </button>
                        <button
                            id="btn-save"
                            type="button"
                            onClick={saveChanges}
                            className="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div >
        )}
    </>);
}


export default OrderModal;