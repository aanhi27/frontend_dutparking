import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonitorPage = () => {
    const [passData, setPassData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hàm gọi API để lấy dữ liệu pass
    const fetchPassData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/DUTParking/monitor/pass-monitor');
            setPassData(response.data);
        } catch (error) {
            console.error('Error fetching pass data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm gọi API để reset dữ liệu
    const resetPassData = async () => {
        try {
            await axios.delete('http://localhost:8080/DUTParking/monitor/pass-monitor/reset');
            setPassData([]);  // Xóa dữ liệu trên bảng
            alert('Dữ liệu đã được reset');
        } catch (error) {
            console.error('Error resetting pass data:', error);
        }
    };

    // Gọi API để lấy dữ liệu mỗi 10 giây
    useEffect(() => {
        const interval = setInterval(fetchPassData, 10000);  // Mỗi 10 giây
        fetchPassData();  // Gọi API lần đầu tiên khi trang được load

        return () => clearInterval(interval);  // Dọn dẹp interval khi component bị hủy
    }, []);

    return (
        <div className="monitor-container">
            <h1>Pass Monitor</h1>

            {/* Nút Reset */}
            <button className="reset-btn" onClick={resetPassData}>Reset Dữ Liệu</button>

            {/* Bảng hiển thị dữ liệu */}
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <table className="pass-data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Tên vé</th>
                            <th>Quyết định</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passData.length === 0 ? (
                            <tr>
                                <td colSpan="5">Không có dữ liệu</td>
                            </tr>
                        ) : (
                            passData.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.hovaten}</td>
                                    <td>{data.email}</td>
                                    <td>{data.ticketName}</td>
                                    <td>{data.decision}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MonitorPage;
