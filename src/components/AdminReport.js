import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NormalSpinner from './Spinner';
import { ReportApi } from '../utilities/ApiClient'
import { useSelector } from 'react-redux';

function AdminReport() {

  const [reportData, setReportData] = useState(null)
  const [error, setError] = useState('')
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user
  const token = userInfo?.token || userInfo?.access

  useEffect(() => {
    if (!token) {
      setError('Sign in as an admin to view this report.')
      return
    }

    const client = new ReportApi(token);
    client.getAllData().then((data) => {
        if (data?.detail && data.total_items == null) {
          setError(data.detail)
          return
        }
        setError('')
        setReportData(data);
        });       
    }, [token]);    

  if (!reportData && !error) {
    return <NormalSpinner />
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <div className={reportData.items_per_charity?.length > 10 ? 'charities-table-scroll' : undefined}>
      <Table striped>
        <tbody>
          <tr>
            <td>Total Items in the database: </td>
            <td>{reportData.total_items}</td>
          </tr>
          <tr>
            <td>Total Charities in the database: </td>
            <td>{reportData.total_charities}</td>
          </tr>
          {reportData.items_per_charity.map((charity, index) => (
            <tr key={index}>
              <td>Items for {reportData.items_per_charity[index].name}</td>
              <td>{reportData.items_per_charity[index].item_count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminReport;