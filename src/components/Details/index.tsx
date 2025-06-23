import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./style.css";


interface Lesson {
  title: string;
  status: "credited" | "debited";
  date: string;
  amount: string;
  backgroundColor: string;
  tillDateBalance?: string;
}

const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams()

  const [bankTransactions, setBankTransactions] = useState([])
  const [currTotal, setCurrTotal] = useState(0)

  const fetchLessonsForTransaction = async () => {
    //@ts-ignore
    const tnxRef = collection(db, "transactions", params.id, "lessons");
    const snapshot = await getDocs(tnxRef);
    const tnxDetails: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const bankTotal = tnxDetails.reduce((sum: any, txn: any) => {
      const amount = Number(txn.amount || 0);
      return txn.status === "debited" ? sum - amount : sum + amount;
    }, 0);
    setCurrTotal(bankTotal)

    let balance = 0;
    const result = [...tnxDetails]; // make a copy
    for (let i = tnxDetails.length - 1; i >= 0; i--) {
      const amount = Number(tnxDetails[i].amount || 0);
      balance += tnxDetails[i].status === "debited" ? -amount : amount;
      result[i] = { ...tnxDetails[i], tillDateBalance: balance };
    }
    //@ts-ignore
    setBankTransactions(result)
  };

  useEffect(() => {
    fetchLessonsForTransaction()
  }, [])

  const addTransactionRecord = async () => {
    try {
      // @ts-ignore
      const lessonsRef = collection(
        db,
        "transactions",
        params?.id,
        "lessons"
      );
      await addDoc(lessonsRef, {
        title: "Subscription2",
        status: "debited",
        date: "23-06-2025",
        amount: "500",
        backgroundColor: "#07ec8b",
      });
      await fetchLessonsForTransaction();
      // await addDoc(collection(db, "transactions"), {
      //   bank: "Aadhi",
      //   amount: "0",
      //   date: "23/06/2025",
      //   type: "credited",
      // });
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  }

  return (
    <div className="course-screen">
      <div className="header">
        <div>
          <h3>UBIN</h3>
          <small>₹{currTotal}</small>
        </div>
        <div onClick={() => navigate("/")}>⬅</div>
      </div>

      <div className="progress-section">
        {/* <div className="progress-circle">56%</div> */}
      </div>
      {/* <button onClick={() => addTransactionRecord()}>Add record</button> */}
      {bankTransactions.length === 0 && <p className="no-cash">No Cash Available</p>}

      <div className="lesson-list">
        {bankTransactions.map((transaction: Lesson, index) => (
          <div
            key={index}
            className="lesson"
            style={{ backgroundColor: transaction?.status === 'credited' ? '#8cf7be' : '#f78c8c' }}
          >
            <div className="lesson-left">
              <div className="lesson-title">{transaction?.title}</div>
              <div className="lesson-time">
                {transaction?.status} ({transaction?.date})
              </div>
            </div>
            <div className="play-icon">
              <span>₹{transaction?.amount}</span>
              <span className="upto-date">₹{transaction?.tillDateBalance}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
