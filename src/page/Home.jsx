// import { useState, useEffect } from 'react';

// const Home = () => {
//   const [farms, setFarms] = useState([]);

//   useEffect(() => {
//     const fetchFarms = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/farm');
//         if (!res.ok) throw new Error('네트워크 응답이 정상적이지 않습니다.');
//         const data = await res.json();

//         if (Array.isArray(data.farms)) {
//           setFarms(data.farms);
//         } else {
//           setFarms([]);
//         }
//       } catch (error) {
//         console.error('❌ API 호출 에러:', error);
//         setFarms([]);
//       }
//     };

//     fetchFarms();
//   }, []);

//   // 최대 6개까지만 화면에 보여주기
//   const farmsToShow = farms.slice(0, 6);

//   return (
//     <div>
//       <h1>텃밭 리스트</h1>
//       {farmsToShow.length === 0 ? (
//         <p>등록된 텃밭이 없습니다.</p>
//       ) : (
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gap: '16px',
//             maxWidth: '900px',
//             margin: '0 auto',
//           }}
//         >
//           {farmsToShow.map((farm) => (
//             <div
//               key={farm.id}
//               style={{
//                 border: '1px solid #ccc',
//                 padding: '12px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//               }}
//             >
//               <h2>{farm.title}</h2>
//               <img
//                 src={farm.thumbnailUrl}
//                 alt={farm.title}
//                 width="100%"
//                 style={{
//                   borderRadius: '4px',
//                   objectFit: 'cover',
//                   height: '150px',
//                 }}
//               />
//               <p>가격: {farm.price}</p>
//               <p>대여기간: {farm.rentalPeriod}</p>
//               <p>주소: {farm.address}</p>
//               <p>{farm.isAvailable ? '대여 가능' : '대여 불가'}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useState, useEffect } from 'react';
// import FarmCard from '../components/common/FarmCard';

// const Home = () => {
//   const [farms, setFarms] = useState([]);

//   useEffect(() => {
//     const fetchFarms = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/farm');
//         if (!res.ok) throw new Error('네트워크 응답이 정상적이지 않습니다.');
//         const data = await res.json();

//         if (Array.isArray(data.farms)) {
//           setFarms(data.farms);
//         } else {
//           setFarms([]);
//         }
//       } catch (error) {
//         console.error('❌ API 호출 에러:', error);
//         setFarms([]);
//       }
//     };

//     fetchFarms();
//   }, []);

//   const farmsToShow = farms.slice(0, 6);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">텃밭 리스트</h1>
//       {farmsToShow.length === 0 ? (
//         <p className="text-center text-gray-500">등록된 텃밭이 없습니다.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {farmsToShow.map((farm) => (
//             <FarmCard key={farm.id} farm={farm} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from 'react';
import FarmCard from '../components/common/FarmCard';
import { mockFarms } from '../data/mockFarms';

const Home = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    setFarms(mockFarms);
  }, []);

  const farmsToShow = farms.slice(0, 6);

  return (
    <div className="p-6">
      <div className="w-1120 h-351">소개배너</div>>
      {farmsToShow.length === 0 ? (
        <p className="text-center text-gray-500">등록된 텃밭이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {farmsToShow.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
