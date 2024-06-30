import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Order } from "../../models/objects/Order";
import { OrderService } from "../../services/OrderService";
import OrderModal from "../../components/OrderModal";
interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions { }

const OrderListPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState("");
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(0);
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
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        OrderService.list().then(response => setOrders(response));
    }

    const getFormattedDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('es-ES', options);
    }

    const openOrderModal = (orderId: number) => {
        setSelectedOrderId(orderId);
        setIsOrderModalOpen(true);
    }

    return (<>
        <HeaderComponent />
        <main className="padding__x">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl text-secondary font-bold my-3">Órdenes</h1>
                <select className="primary__button" onChange={(e) => setFilter(e.target.value)}>
                    <option value="" className="text-primary">Todas</option>
                    <option value="entregado" className="text-primary">Entregadas</option>
                    <option value="recibido" className="text-primary">Recibidas</option>
                    <option value="confirmado" className="text-primary">Confirmadas</option>
                    <option value="cancelado" className="text-primary">Canceladas</option>
                    <option value="reembolsado" className="text-primary">Reembolsadas</option>
                    <option value="completado" className="text-primary">Completadas</option>
                </select>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-secondary">
                        <th className="text-lg ps-3 pb-2 text-left">Dirección</th>
                        <th className="text-lg ps-3 pb-2 text-left">Fecha de Entrega</th>
                        <th className="text-lg ps-3 pb-2 text-left">Notas</th>
                        <th className="text-lg ps-3 pb-2 text-left">Teléfono</th>
                        <th className="text-lg ps-3 pb-2 text-left">Estado</th>
                        <th className="text-lg ps-3 pb-2 text-left">Monto Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders
                        .filter(order => filter === "" || order.status === filter)
                        .map(order => (
                            <tr key={"cat-" + order.id}>
                                <td className="ps-3">{order.address}</td>
                                <td className="ps-3">{getFormattedDate(order.delivery_date)}</td>
                                <td className="ps-3">{order.note}</td>
                                <td className="ps-3">{order.phone_number}</td>
                                <td className="ps-3">{order.status}</td>
                                <td className="ps-3">{order.total_amount}</td>
                                <td>
                                    <button
                                        className="primary__button p-1"
                                        onClick={() => openOrderModal(order.id!)}>
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </main>
        <OrderModal handleOpen={() => setIsOrderModalOpen(false)} isOpen={isOrderModalOpen}
            orderId={selectedOrderId} onSucess={() => fetchOrders()}/>
    </>);
}

export default OrderListPage;