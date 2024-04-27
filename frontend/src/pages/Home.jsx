import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then(res => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);
  return (
      <div className='p-4'>
          <div className='flex justify-center items-center '>
              <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create' >
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
              </Link>
          </div>
          {loading ? (
              <Spinner />
          ) : (
                  <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className='border px-4 py-2'>Title</th>
                                <th className='border px-4 py-2'>Author</th>
                                <th className='border px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book,index) => (
                                <tr key={book._id}>
                                    <td className='border px-4 py-2'>{book.title}</td>
                                    <td className='border px-4 py-2'>{book.author}</td>
                                    <td className='border px-4 py-2'>
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className='text-sky-800 text-2xl mx-2' />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className='text-sky-800 text-2xl mx-2' />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-sky-800 text-2xl mx-2' />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                      </tbody>
                    </table>
          )}
    </div>
  )
}



export default Home