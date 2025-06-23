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
  // const fetchData = async () => {
  //   const snapshot = await getDocs(collection(db, "transactions"));
  //   const data = snapshot.docs.map((doc) => ({
  //     id: doc.id, // 🔥 this is the Firestore document ID
  //     ...doc.data(),
  //   }));
  //   console.log("data", data);

  //   // setTransactions(data);
  // };

  // const fetchLessonsForTransaction = async (transactionId: string) => {
  //   const lessonsRef = collection(
  //     db,
  //     "transactions",
  //     "RgenJtefWafmawVZP7aH",
  //     "lessons"
  //   );
  //   const snapshot = await getDocs(lessonsRef);
  //   const lessons = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   console.log("lessons", lessons);
  // };

  useEffect(() => {
    // fetchData();
    // fetchLessonsForTransaction();
    fetchTransactionsWithLessons();
  }, []);

  // const addSampleData = async () => {
  //   await addDoc(collection(db, "transactions"), {
  //     bank: "PNB",
  //     amount: "$2345",
  //     date: "15/6/7",
  //     type: "Credited",
  //   });

  //   // await addDoc(collection(db, "lessons"), {
  //   //   title: "Chits",
  //   //   status: "credited",
  //   //   date: "01/01/2025",
  //   //   amount: "$1234",
  //   //   backgroundColor: "#07ec8b",
  //   // });
  //   await fetchData();
  // };

  // const addLessonToTransaction = async (transactionId: string, lesson: any) => {
  //   try {
  //     const lessonsRef = collection(
  //       db,
  //       "transactions",
  //       "RgenJtefWafmawVZP7aH",
  //       "lessons"
  //     );
  //     await addDoc(lessonsRef, {
  //       title: "Subscription",
  //       status: "credited",
  //       date: "2025-01-10",
  //       amount: "$789",
  //       backgroundColor: "#07ec8b",
  //     });
  //     await fetchData();
  //     await fetchLessonsForTransaction();
  //   } catch (error) {
  //     console.error("Error adding lesson:", error);
  //   }
  // };

  // const updateLessonInTransaction = async (
  //   transactionId: string,
  //   lessonId: string,
  //   updatedData: Partial<Lesson>
  // ) => {
  //   try {
  //     const lessonDocRef = doc(db, 'transactions', transactionId, 'lessons', lessonId);
  //     await updateDoc(lessonDocRef, updatedData);
  //     alert('Lesson updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating lesson:', error);
  //   }
  // };

  // const deleteLessonFromTransaction = async (
  //   transactionId: string,
  //   lessonId: string
  // ) => {
  //   try {
  //     const lessonRef = doc(db, 'transactions', transactionId, 'lessons', lessonId);
  //     await deleteDoc(lessonRef);
  //     alert('Lesson deleted successfully!');
  //   } catch (error) {
  //     console.error('Error deleting lesson:', error);
  //   }
  // };

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
      {/* <button onClick={() => addSampleData("d")}>Add data</button> */}
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
                <div>{item?.date}</div>
                <div>{item?.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
