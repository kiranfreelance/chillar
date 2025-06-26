import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./index.css";

const TransactionForm = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    status: 'credited',
    date: ''
  })
  const { title, amount, status, date } = formData

  const addTransactionRecord = async (e: any) => {
    e.preventDefault();
    const [year, month, day] = date.split("-");
    try {
      // @ts-ignore
      const lessonsRef = collection(
        db,
        "transactions",
        params?.id,
        "lessons"
      );
      await addDoc(lessonsRef, {
        title: title,
        status: status,
        date: `${day}-${month}-${year}`,
        amount: amount,
      });
      navigate(`/course-detail/${params.id}`);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Add Transaction</h2>
      <form>
        <div>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            required
            value={amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="country">Status</label>
          <select
            value={status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="credited">Credited</option>
            <option value="debited">Debited</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date</label>
          <input type="date"
            value={date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <button type="button" onClick={() => navigate(`/course-detail/${params.id}`)}>Close</button>
          <button type="button" onClick={(e) => addTransactionRecord(e)}>Submit</button>
        </div>
      </form >
    </div >
  );
};

export default TransactionForm;
