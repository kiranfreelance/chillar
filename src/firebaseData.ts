
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


export const data=''