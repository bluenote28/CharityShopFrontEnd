import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { DatabaseRefreshApi} from '../utilities/ApiClient'
import { useSelector, useDispatch } from 'react-redux';
import { deleteCharity } from '../actions/charityActions';

function CharitiesTable(props) {

 const allData = props.data;
 const [filteredData, setFilteredData] = useState(allData)
 const user = useSelector((state) => state.userLogin);
 const { userInfo } = user
 const dispatch = useDispatch()

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

 function deleteButtonClick(id) {
    
    dispatch(deleteCharity(id))
  
    window.location.reload();
 }

 function updateCharityItemsInDB(id, name, description){

    const client = new DatabaseRefreshApi(userInfo.access)
    client.update({'id': id, 'name': name, 'description': description})

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
              <th>Update</th>
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
                        <td><Button variant="primary" onClick={() => deleteButtonClick(item.id)}>Delete</Button></td>
                        <td><Button variant="primary" onClick={() => updateCharityItemsInDB(item.id, item.name,item.description)}>Refresh Items</Button></td>
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