// components/Footer.tsx

import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 flex flex-col justify-center text-center text-textSecondary">
      <div className="mb-4 flex justify-center">
        <Image src="https://i.imgs.ovh/2023/10/06/L3TVU.png" alt="Footer Logo" width={32} height={32} />
      </div>
      <p>© 2023 Biz. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
