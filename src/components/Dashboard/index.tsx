import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./style.css";
import { formatINRCurrency } from "../../utils";

interface CourseItem {
  bank: string;
  amount: string;
  date: string;
  type: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<CourseItem[]>([]);
  const [currTotal, setCurrTotal] = useState(0)

  const showDetails = (item: any) => {
    navigate(`/course-detail/${item.id}`);
  };
  useEffect(() => {
    fetchTransactionsWithLessons();
  }, []);

  const fetchTransactionsWithLessons = async () => {
    const transactionsRef = collection(db, "transactions");
    const txnSnapshot = await getDocs(transactionsRef);
    const transactions = await Promise.all(
      txnSnapshot.docs.map(async (txnDoc) => {
        const txnData = txnDoc.data();
        const txnId = txnDoc.id;
        const tnxRef = collection(db, "transactions", txnId, "lessons");
        const tnxSnapshot = await getDocs(tnxRef);
        const tnxDetails = tnxSnapshot.docs.map((lessonDoc) => ({
          id: lessonDoc.id,
          ...lessonDoc.data(),
        }));
        const bankTotal = tnxDetails.reduce((sum, txn: any) => {
          const amount = Number(txn.amount || 0);
          return txn.status === "debited" ? sum - amount : sum + amount;
        }, 0);
        return {
          id: txnId,
          ...txnData,
          amount: bankTotal,
          tnxDetails,
        };
      })
    );

    const totalTnxAmount = transactions.reduce((total, item) => {
      const tnxSum = item.tnxDetails.reduce((sum, txn: any) => {
        const amount = Number(txn.amount || 0);
        return txn.status === "debited" ? sum - amount : sum + amount;
      }, 0);
      return total + tnxSum;
    }, 0);
    setCurrTotal(totalTnxAmount)
    //@ts-ignore
    setCardData(transactions);
  };
  console.log("cardData", cardData);

  return (
    <div className="container">
      <div className="top-bar">
        <div className="top-bar-header">
          <span>&#9776;</span>
          <span>{formatINRCurrency(currTotal)}</span>
          <span>&#128100;</span>
        </div>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="main-content">
        <div className="course-list">
          {cardData.map((item: any, idx) => (
            <div className={`card ${item.bank === 'SBI' ? 'sbi' : 'ubin'}`} key={idx} onClick={() => showDetails(item)}>
              <div className="overlay"></div>
              <div className="row">
                <div className="label">{item?.name}</div>
                <div className="amount label">{formatINRCurrency(item?.amount)}</div>
              </div>
              <div className="row">
                <div>{item?.tnxDetails[item?.tnxDetails.length - 1]?.date}</div>
                <div>{item?.tnxDetails[item?.tnxDetails.length - 1]?.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
