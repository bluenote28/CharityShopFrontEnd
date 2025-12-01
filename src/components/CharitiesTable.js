import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { CharityApi} from '../utilities/ApiClient'

function CharitiesTable(props) {

 const allData = props.data;
 const [filteredData, setFilteredData] = useState(allData)

 useEffect(() => {
    setFilteredData(allData);
 }, [allData]);

 function searchCharity(data, search) {
    if (search === "") {
        setFilteredData(allData);
    }
    setFilteredData(data.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    }));
 }

 function deleteCharity(id) {
    const client = new CharityApi();
    client.delete(id).then((data) => {
        console.log(data);
    });
    window.location.reload();
 }

  return (
    <>
        <Form.Control className='mb-3' type="id" placeholder="Search" onChange={(e) => searchCharity(allData,e.target.value)}/>
        <Table striped>
          <thead>
            <tr>
              <th>Charity ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
          
            {
              filteredData && filteredData.map(
                (item, index) => {
                    return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td><Button variant="primary" onClick={() => deleteCharity(item.id)}>Delete</Button></td>
                    </tr>
                    )
                }
                ) 
            }

          </tbody>
        </Table>
    </>
  );
}

export default CharitiesTable;