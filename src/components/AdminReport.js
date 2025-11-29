import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NormalSpinner from './Spinner';
import { ReportApi } from '../utilities/ApiClient'
import { useSelector } from 'react-redux';

function AdminReport() {

  const [reportData, setReportData] = useState(null)
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user
  const client = new ReportApi(userInfo.access);

  useEffect(() => {
    client.getAllData().then((data) => {
        setReportData(data);
        });       
    });    

  return (
    <>
    {!reportData? <NormalSpinner /> :   
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
           {
               reportData.items_per_charity.map((charity, index) => {
                    return (
                        <tr key={index}>
                            <td>Items for {reportData.items_per_charity[index].name}</td>
                            <td>{reportData.items_per_charity[index].item_count}</td>
                        </tr>
                    )
                })
            }

          </tbody>
        </Table>
    }
    </>
  );
}

export default AdminReport;