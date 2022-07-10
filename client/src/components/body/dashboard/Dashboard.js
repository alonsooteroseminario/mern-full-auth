import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Dashboard() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }

    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    return (
        <>
        <div className="profile_page">
            <div class="rad-body-wrapper rad-nav-min">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="panel panel-default">
                                <h2>Projects asigned to Users</h2>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            
                                            <th scope="col">Project/text Name</th>
                                            <th scope="col">Asigned to</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        <tr>
                                            
                                            <td>  </td>
                                            <td>  </td>
                                            <td>  </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>

                                    <h2>Manage Users</h2>
                                    <table class="table">
                                    <thead class="thead-light">
                                        <tr>
                                        <div class="form-row">
                                                        <div class="col">
                                                            <label>Name</label>
                                                            <input type="text" class="form-control" placeholder="Name" name="name" required/>
                                                        </div>
                                                        <div class="col">
                                                            <label>Email</label>
                                                            <input type="text" class="form-control" placeholder="Email" name="username" required/>
                                                        </div>
                                                        <div class="col">
                                                            <label>New User</label>
                                                            <div class="input-group">
                                                                <button class="btn btn-primary" type="submit">Create</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                        </tr>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Addres</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Project</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        <span> 
                                            <br/>
                                            <br/>
                                        </span>
                                    </thead>
                                    <tbody>
                                    <tr>
                                                <th scope="row"> # </th>
                                                <td></td>
                                                <td>  </td>
                                                <td>  </td>
                                                <td>  </td>
                                                <td>   </td>
                                                <td> </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
