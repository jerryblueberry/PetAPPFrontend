import {createContext,useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';

const UserType = createContext();

const UserContext = ({children}) => {
    const [userId,setUserId] = useState("");
    const [userToken,setUserToken] = useState('');

useEffect(() => {
    const fetchUsers = async () => {
        const token = await AsyncStorage.getItem('authToken');
        setUserToken(token);
        console.log("Received TOkne",userToken)
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
      
     
  
        setUserId(userId);
  
        axios
          .get(`${api}/loggedUser/${userId}`)
          // .get(`https://petservernew.onrender.com/loggedUser/${userId}`)
          .then((response) => {
            setLoggedInUser(response.data);
          })
          .catch((error) => {
            console.log('Error retrieving logged-in user', error);
          });
      };
      fetchUsers();

})
    
    return(
        <UserType.Provider value={{userId,setUserId,userToken,setUserToken}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType,UserContext}