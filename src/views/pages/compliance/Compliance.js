import React, { useState } from 'react';
import { Tab, Tabs, TabPanel, TabList, TabPanels,ChakraProvider,Box, Input, Stack, GridItem, Grid, Select, FormLabel, Text, Divider, Button } from '@chakra-ui/react';
import { CContainer } from '@coreui/react'
import axios from "axios";
import 'antd/dist/antd.css';
import { message, Upload } from 'antd';
import { ArrowUpIcon } from '@chakra-ui/icons';


// import { UploadOutlined } from '@ant-design/icons';


const userData = JSON.parse(localStorage.getItem('userDataStore'));

export default function Compliance() {

    // Business Information useState declaration
    const [postal_address, setPostalAddress] = useState(userData.postal_address)
    const [business_email, setBusinessEmail] = useState(userData.business_email) 
    const [business_name, setBusinessName] = useState(userData.business_name)
    const [gps, setGps] = useState(userData.gps)
    const [business_TIN, setBusinessTIN] = useState(userData.business_TIN)
    const [NID_director_1, setNID_director_1] = useState(userData.NID_director_1)
    const [NID_director_2, setNID_director_2] = useState(userData.NID_director_2)
    const [physical_address, setPhysicalAddress] = useState(userData.physical_address)

    // Settlement Information useState declaration
    const [bank_name, setBankName] = useState(userData.bank_name)
    const [bank_account, setBankAccount] = useState(userData.bank_account)
    const [bank_branch, setBankBranch] = useState(userData.bank_branch)

    // Personal Information useState declaration
    const [firstname, setFirstname] = useState(userData.firstname)
    const [lastname, setLastname] = useState(userData.lastname)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone)

    //State for director One initialization
    const [directorOneList, setDirectorOneList] = useState([]);
    const [uploading1, setUploading1] = useState(false);

    //State for directors initialization
    const [directorTwoList, setDirectorTwoList] = useState([]);
    const [uploading2, setUploading2] = useState(false);

    //State for Business Documents initialization
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);


    //Business Information
    const handleBusinessInfoSubmit = (event) => {
        event.preventDefault();
        
        const payload = {
          "postal_address": postal_address,
          "business_email": business_email,
          "business_name": business_name,
          "gps": gps,
          "business_TIN": business_TIN,
          "postal_address": postal_address,
          "NID_director_1": NID_director_1,
          "NID_director_2": NID_director_2,
        }
        console.log(payload)
          let config = {
            method: 'patch',
            url: process.env.REACT_APP_BASE_API + '/account/update/',
           
            headers: {
              'Content-Type': 'application/json',
              "Authorization" : `Bearer ${userData.access}`
            },
            data: payload
          };
          console.log(config)
          axios(config).then(function (response){
            // if (response["data"]["message"] === "Account successfully updated." && response["data"]["status"] === true){
                message.success('Account successfully updated.');
            //   }

            })
            .catch(function (error) {
            console.log(error);
          });
        };


    // Settlement Info Patch request      
    const handleSettlementInfoSubmit = (event) => {
        event.preventDefault();
    
        const payload = {
            "bank_name": bank_name,
            "bank_account": bank_account,
            "bank_branch": bank_branch,
        }
        console.log(payload)
            let config = {
            method: 'patch',
            url: process.env.REACT_APP_BASE_API + '/account/update/',
            
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${userData.access}`
            },
            data: payload
            };
            console.log(config)
            axios(config).then(function (response){
                console.log(response)
            })
            .catch(function (error) {
            console.log(error);
            });
        };


    // Personal Info Patch request
            
    const handlePersonalInfoSubmit = (event) => {
        event.preventDefault();
    
        const payload = {
            "firstname": firstname,
            "lastname": lastname,
        }
        console.log(payload)
            let config = {
            method: 'patch',
            url: process.env.REACT_APP_BASE_API + '/account/update/',
            
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${userData.access}`
            },
            data: payload
            };
            axios(config).then(function (response){
                console.log(response["data"])
            })
            .catch(function (error) {
            console.log(error);
            });
        };
    // File Upload section


    //Business Documents
    const handleUpload = () => {
        const formData3 = new FormData();
        fileList.forEach((certOfIncoporation) => {
            formData3.append('business_registration_docs', certOfIncoporation);
              // console.log("rtghrghhrthrhrthrthrthrtrtrtgrt", certOfIncoporation)

          let config = {
            method: 'patch',
            url: process.env.REACT_APP_BASE_API + '/account/docs/' + userData.account,
            headers: {
                "Authorization" : `Bearer ${userData.access}`,
                'Content-Type': 'application/json',
            },
            data: formData3
        };
        console.log(config)
            axios(config).then(function (response){
            
            console.log(response["data"])
            if (response["data"]) {
                message.success('file successfully uploaded.');
            }
            if (!response["data"]) {
                message.error('Sorry, something went wrong. Please try again.');
            }

            })
            .catch(function (error) {
                
            console.log(error);
            });
        });
        setUploading(false); // You can use any AJAX library you like
      };

      const props = {
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        },
        beforeUpload: (file) => {
          setFileList([...fileList, file]);
          return false;
        },
        fileList,
      };

    // ID of Director 1

    const handleDirectorOneUpload = () => {
        const formData1 = new FormData();
        directorOneList.forEach((directorOneID) => {
            formData1.append('id_director_1', directorOneID);
              // console.log("rtghrghhrthrhrthrthrthrtrtrtgrt", directorOneID)

          let config = {
            method: 'patch',
            url: process.env.REACT_APP_BASE_API + '/account/docs/' + userData.account,
            headers: {
                "Authorization" : `Bearer ${userData.access}`,
                'Content-Type': 'application/json',
            },
            data: formData1
        };
        console.log(config)
            axios(config).then(function (response){
            
            console.log(response["data"])
            if (response["data"]) {
                message.success('file successfully uploaded.');
            }
            if (!response["data"]) {
                message.error('Sorry, something went wrong. Please try again.');
            }

            })
            .catch(function (error) {
                
            console.log(error);
            });
        });
        setUploading1(false); // You can use any AJAX library you like
      };

      const props1 = {
        onRemove: (directorOneID) => {
          const index = directorOneList.indexOf(directorOneID);
          const newDirectorOneList = directorOneList.slice();
          newDirectorOneList.splice(index, 1);
          setDirectorOneList(newDirectorOneList);
        },
        beforeUpload: (directorOneID) => {
            setDirectorOneList([...directorOneList, directorOneID]);
          return false;
        },
        directorOneList,
      };

    //ID of Director 2
    
    const handleDirectorTwoUpload = () => {
        const formData2 = new FormData();
        directorTwoList.forEach((directorTwoID) => {
            formData2.append('id_director_2', directorTwoID);
              // console.log("rtghrghhrthrhrthrthrthrtrtrtgrt", directorTwoID)

          let config = {
            method: 'patch',
            url: process.env.REACT_APP_BASE_API + '/account/docs/' + userData.account,
            headers: {
                "Authorization" : `Bearer ${userData.access}`,
                'Content-Type': 'application/json',
            },
            data: formData2
        };
        console.log(config)
            axios(config).then(function (response){
            
            console.log(response["data"])
            if (response["data"]) {
                message.success('file successfully uploaded.');
            }
            if (!response["data"]) {
                message.error('Sorry, something went wrong. Please try again.');
            }

            })
            .catch(function (error) {
                
            console.log(error);
            });
        });
        setUploading2(false); // You can use any AJAX library you like
      };

      const props2 = {
        onRemove: (file) => {
          const index = directorTwoList.indexOf(file);
          const newDirectorTwoList = directorTwoList.slice();
          newDirectorTwoList.splice(index, 1);
          setDirectorTwoList(newDirectorTwoList);
        },
        beforeUpload: (file) => {
            setDirectorTwoList([...directorTwoList, file]);
          return false;
        },
        directorTwoList,
      };


      function updateKycInUserSession(type, value){
        let user_data = {}
        switch (type) {
            case "firstname":
                user_data = {
                    "firstname": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "lastname":
                user_data = {
                    "lastname": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "email":
                user_data = {
                    "email": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "business_email":
                user_data = {
                    "business_email": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "business_name":
                user_data = {
                    "business_name": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "gps":
                user_data = {
                    "gps": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "business_TIN":
                user_data = {
                    "business_TIN": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "postal_address":
                user_data = {
                    "postal_address": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "NID_director_1":
                user_data = {
                    "NID_director_1": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "NID_director_2":
                user_data = {
                    "NID_director_2": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "bank_name":
                user_data = {
                    "bank_name": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "bank_account":
                user_data = {
                    "bank_account": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "bank_branch":
                user_data = {
                    "bank_branch": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "phone":
                user_data = {
                    "phone": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            case "physical_address":
                user_data = {
                    "physical_address": value
                };
                Object.keys(user_data)?.map(id=>{
                    userData[id] =  user_data[id]
                })
                break;
            default:
                break;
        }
        localStorage.setItem("userDataStore", JSON.stringify(userData));
    }
    


return(
    <div className="bg-light mt-5 d-flex flex-row align-items-center">
        <CContainer>
        <ChakraProvider>
            <Box boxShadow='lg' rounded='md' bg='white'>                               
            <Tabs size='md' variant='enclosed'>

                <TabList>
                <Tab>Personal Information</Tab>
                <Tab>Business Information</Tab>
                <Tab>Settlement Information</Tab>
                <Tab>Upload Documents</Tab>
                </TabList>

                <TabPanels>  

                <TabPanel>
                <Stack spacing={3}>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>

                    <GridItem colStart={1} colEnd={3} h='10'>
                    <p>We&apos;d like to get too know you personally. At Wingipay, we cherish friendships as much as we cherish businesses.</p>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='First Name' focusBorderColor='orange.500' onChange={(e) => { (setFirstname(e.target.value)); (updateKycInUserSession("firstname", e.target.value)) }} value = {firstname} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Last Name' focusBorderColor='orange.500'  onChange={(e) => { (setLastname(e.target.value)); (updateKycInUserSession("lastname", e.target.value)) }} value = {lastname} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Email Address' focusBorderColor='orange.500' disabled type = 'email'  onChange={(e) => { (setEmail(e.target.value)); (updateKycInUserSession("email", e.target.value)) }} value = {email}/>
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Phone Number' focusBorderColor='orange.500' disabled  onChange={(e) => { (setPhone(e.target.value)); (updateKycInUserSession("phone", e.target.value)) }} value = {phone}/>
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                    <Button colorScheme='orange' onClick={handlePersonalInfoSubmit} style = {{color: "#fff"}}>Save Changes</Button>
                    </GridItem>
                </Grid>                                   
                </Stack>
                </TabPanel>
                <TabPanel>
                <Stack spacing={3}>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    <p>Receving funds should not be a headache. With our platform, your payments are secure and swift.</p>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Business Name' focusBorderColor='orange.500' onChange={(e) => { (setBusinessName(e.target.value)); (updateKycInUserSession("business_name", e.target.value)) }} value = {business_name} />
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Business Physical Address' focusBorderColor='orange.500' onChange={(e) => { (setPhysicalAddress(e.target.value)); (updateKycInUserSession("physical_address", e.target.value)) }} value = {physical_address} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Business Email Address' focusBorderColor='orange.500' onChange={(e) => { (setBusinessEmail(e.target.value)); (updateKycInUserSession("business_email", e.target.value)) }} value = {business_email}/>
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Business GPS Address' focusBorderColor='orange.500' onChange={(e) => { (setGps(e.target.value)); (updateKycInUserSession("gps", e.target.value)) }} value = {gps} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Business Tax Identification Number (TIN)' focusBorderColor='orange.500' onChange={(e) => { (setBusinessTIN(e.target.value)); (updateKycInUserSession("business_TIN", e.target.value)) }} value = {business_TIN} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Business Postal Address (Optional)' focusBorderColor='orange.500' onChange={(e) => { (setPostalAddress(e.target.value)); (updateKycInUserSession("postal_address", e.target.value)) }} value = {postal_address} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='ID of Director 1' focusBorderColor='orange.500' onChange={(e) => { (setNID_director_1(e.target.value)); (updateKycInUserSession("NID_director_1", e.target.value)) }} value = {NID_director_1} />
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='ID of Director 2' focusBorderColor='orange.500' onChange={(e) => { (setNID_director_2(e.target.value)); (updateKycInUserSession("NID_director_2", e.target.value)) }} value = {NID_director_2}/>
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                    <Button type = "submit" colorScheme='orange' onClick={(e) => handleBusinessInfoSubmit(e)} style = {{color: "#fff"}}>Save Changes</Button>
                    </GridItem>
                    </Grid>
                    </Stack>                    
                </TabPanel>

                <TabPanel>
                <Stack spacing={3}>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>

                    <GridItem colStart={1} colEnd={3} h='10'>
                    <p>We&apos;d like to get too know you personally. At Wingipay, we cherish friendships as much as we cherish businesses.</p>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                    <Select placeholder='Select Bank' onChange={(e) => { (setBankName(e.target.value)); (updateKycInUserSession("bank_name", e.target.value)) }} value = {bank_name}>
                    <option value={"Absa Bank Ghana Ltd"}>Absa Bank Ghana Ltd</option>
                    <option value={"Access Bank"}>Access Bank</option>
                    <option value={"Agricultural Development Bank"}>Agricultural Development Bank</option>
                    <option value={"Bank of Africa"}>Bank of Africa</option>
                    <option value={"Bank of Ghana"}>Bank of Ghana</option>
                    <option value={"Cal Bank"}>Cal Bank</option>
                    <option value={"CBG Bank"}>CBG Bank</option>
                    <option value={"Ecobank"}>Ecobank</option>
                    <option value={"Energy Bank"}>Energy Bank</option>
                    <option value={"Fidelity Bank"}>Fidelity Bank</option>
                    <option value={"First Atlantic Bank"}>First Atlantic Bank</option>
                    <option value={"First National Bank"}>First National Bank</option>
                    <option value={"GCB Bank Ltd"}>GCB Bank Ltd</option>
                    <option value={"GHL Bank"}>GHL Bank</option>
                    <option value={"uaranty Trust Bank"}>Guaranty Trust Bank</option>
                    <option value={"GHFC Bank"}>GHFC Bank</option>
                    <option value={"Letshego Savings And Loans"}>Letshego Savings And Loans</option>
                    <option value={"National Investment Bank"}>National Investment Bank</option>
                    <option value={"Prudential Bank"}>Prudential Bank</option>
                    <option value={"Servies Integrity Savings & Loans"}>Servies Integrity Savings & Loans</option>
                    <option value={"Stanbic Bank"}>Stanbic Bank</option>
                    <option value={"United bank for Africa"}>United bank for Africa</option>
                    <option value={"Standard Chartered Bank"}>Standard Chartered Bank</option>
                    <option value={"Universal Merchant Bank"}>Universal Merchant Bank</option>
                    <option value={"Zenith Bank"}>Zenith Bank</option>
                    </Select>           
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Bank Account Number' focusBorderColor='orange.500' onChange={(e) => { (setBankAccount(e.target.value)); (updateKycInUserSession("bank_account", e.target.value)) }} value = {bank_account}/>
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                        <Input placeholder='Bank Branch' focusBorderColor='orange.500' onChange={(e) => { (setBankBranch(e.target.value)); (updateKycInUserSession("bank_branch", e.target.value)) }} value = {bank_branch}/>
                    </GridItem>
                    <GridItem colStart={1} colEnd={3} h='10'>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5} h='10'>
                    <Button colorScheme='orange' onClick={(e) => handleSettlementInfoSubmit(e)} style = {{color: "#fff"}}>Save Changes</Button>
                    </GridItem>
                </Grid>                                   
                </Stack>                
                </TabPanel>

                <TabPanel>
                <Text fontSize='2xl'>Submit the following documents together as one pdf file</Text>
                <Text fontSize='1xl'>1. Certificate of Incorporation</Text>
                <Text fontSize='1xl'>2. Form 3/Form 4</Text>
                <Text fontSize='1xl'>3. (Sole Proprietor)</Text>
                    <br />
                    {/* <ul> */}

                    {/* </ul>
                    <li></li>
                    <li></li>
                    <br />
                    <p>
                        Upload business documents here
                        <br />
                    <input type = "file" onChange={handleChange}/>
                    </p>
                    <br />
                    <br />
                    {
                        [...Array(directors)].map((post, id)=>
                        [<input key = {id} type = "file" className = "mb-3" />, <br key = {id}/>]  
                        )
                    }
                    
                    <Button colorScheme='orange' onClick={addMoreDirectors}>Add more</Button>
                    <br />
                    <br />
                    <Button colorScheme='orange' onClick={handleFileSubmit} >Submit</Button>
                    <br />
                    <br /> */}


                   
                    <Upload {...props} onChange={(e) => { setBusinessTIN(e.target.value) }} value = {business_TIN} maxCount={1} >
                    <Button leftIcon={<ArrowUpIcon />}>Select File</Button>
                    </Upload>
                    <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                    marginTop: 16,
                    }}
                    >
                    {uploading ? 'Uploading' : 'Upload Business Documents'}
                    </Button>
                    <br />
                    <br />
                    <Divider />
    
                    <br />
                    <Upload {...props1} maxCount={1} >
                    <Button >Select File</Button>
                    </Upload>
                    <Button
                    type="primary"
                    onClick={handleDirectorOneUpload}
                    disabled={directorOneList.length === 0}
                    loading={uploading1}
                    style={{
                    marginTop: 16,
                    }}
                    >
                    {uploading1 ? 'Uploading' : 'Upload ID of First Director'}
                    </Button>
                    <br />
                    <br />
                    <Divider />
                    <br />
                    <Upload {...props2} maxCount={1} >
                    <Button >Select File</Button>
                    </Upload>
                    <Button
                    type="primary"
                    onClick={handleDirectorTwoUpload}
                    disabled={directorTwoList.length === 0}
                    loading={uploading2}
                    style={{
                    marginTop: 16,
                    }}
                    >
                    {uploading2 ? 'Uploading' : 'Upload ID of Second Director'}
                    </Button>

                    

                </TabPanel>
                </TabPanels>
                </Tabs>
            </Box>
        </ChakraProvider>
    </CContainer>
    </div>
                    
);
}