const currentDate = new Date();
export const products = [
    {
        _id: "1",
        campaign: {
            endDate: currentDate.setDate(currentDate.getDate() + 1),
            discountPercentage: 20
        },
        stock: 10,
        star: 3.7,
        comments: [],
        brand: "Osse",
        name: "Polarize Güneş Gözlüğü",
        price: 699,
        img: 'https://stn-atasun.mncdn.com/mnresize/360/360/Content/media/ProductImg/original/gu036373-os3508-03-5816140-638447296945369552.png?v=r7n1d150'
    },
    {
        _id: "2",
        stock: 0,
        star: 5,
        comments: [],
        brand: "RAY-BAN",
        name: "Polarize Güneş Gözlüğü",
        price: 1099,
        img: 'https://stn-atasun.mncdn.com/mnresize/800/800/Content/media/ProductImg/original/gu032570-rb-3548n-1-5421145-637958968263488610.png?v=r7n1d150'
    },
    {
        _id: "3",
        stock: 10,
        star: 2.7,
        comments: [],
        brand: "VOGUE",
        name: "Polarize Güneş Gözlüğü",
        price: 899,
        img: 'https://stn-atasun.mncdn.com/mnresize/800/800/Content/media/ProductImg/original/gu034665-9448-944804-5717142-638308059425115313.png?v=r7n1d150'
    },
    {
        _id: "4",
        campaign: {
            endDate: currentDate.setDate(currentDate.getDate() + 1),
            discountPercentage: 10
        },
        stock: 10,
        star: 4.8,
        comments: [],
        brand: "Osse",
        name: "Polarize Güneş Gözlüğü",
        price: 999,
        img: 'https://stn-atasun.mncdn.com/mnresize/800/800/Content/media/ProductImg/original/gu036373-os3508-03-5816140-638447296945369552.png?v=r7n1d150'
    },
    {
        _id: "5",
        stock: 1,
        star: 5,
        comments: [],
        brand: "RAY-BAN",
        name: "Polarize Güneş Gözlüğü",
        price: 1200,
        img: 'https://stn-atasun.mncdn.com/mnresize/800/800/Content/media/ProductImg/original/gu030808-rb-4171-6012p-5418145-638016111839063446.png?v=r7n1d150'
    },
    {
        _id: "6",
        stock: 10,
        star: 5,
        comments: [],
        brand: "VOGUE",
        name: "Polarize Güneş Gözlüğü",
        price: 899,
        img: 'https://stn-atasun.mncdn.com/mnresize/360/360/Content/media/ProductImg/original/gu034665-9448-944804-5717142-638308059425115313.png?v=r7n1d150'
    },
    {
        _id: "7",
        stock: 1,
        star: 5,
        comments: [],
        brand: "RAY-BAN",
        name: "Polarize Güneş Gözlüğü hjgjhg jhgjhgj jhgjhg",
        price: 1200,
        img: 'https://stn-atasun.mncdn.com/mnresize/360/360/Content/media/ProductImg/original/gu030808-rb-4171-6012p-5418145-638016111839063446.png?v=r7n1d150'
    },
    {
        _id: "8",
        stock: 10,
        star: 5,
        comments: [],
        brand: "VOGUE",
        name: "Polarize Güneş Gözlüğü",
        price: 899,
        img: 'https://stn-atasun.mncdn.com/mnresize/360/360/Content/media/ProductImg/original/gu034665-9448-944804-5717142-638308059425115313.png?v=r7n1d150'
    },
]

export const formatPrice = (price) => {
    const parts = price?.toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] ? `,${parts[1]}` : '';
    return `${integerPart}${decimalPart}`;
  };

export const calculateRemainingTime = (endDate) => {
    const currentDate = new Date();
    const remainingTime = new Date(endDate) - currentDate;
  
    if (remainingTime <= 0) {
      return '0';
    }
  
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  
    const months = Math.floor(days / 30);
    const weeks = Math.floor((days % 30) / 7);
    const remainingDays = days % 7;
  
    let remainingTimeString = '';
  
    if (months > 0) {
      remainingTimeString += `${months} ay `;
    }
    if (weeks > 0) {
      remainingTimeString += `${weeks} hafta `;
    }
    if (remainingDays > 0) {
      remainingTimeString += `${remainingDays} gün `;
    }
    if (hours > 0) {
      remainingTimeString += `${hours} saat `;
    }
    if (minutes > 0) {
      remainingTimeString += `${minutes} dakika `;
    }
    if (seconds > 0) {
      remainingTimeString += `${seconds} saniye`;
    }
  
    return remainingTimeString.trim();
  };