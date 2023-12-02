import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@/store/walletSlice';
import { RootState } from '@/store/store';
import { postRegistration } from '@/api/regiteration';
import { Uploader3 } from '@lxdao/uploader3';
import { createConnector } from '@lxdao/uploader3-connector';
import type { Uploader3Connector } from '@lxdao/uploader3-connector';
import { CroppedFile, SelectedFile, UploadFile, UploadResult, Uploader3FileStatus} from '@lxdao/uploader3';
import { Img3 } from '@lxdao/img3';
import Image from 'next/image';
import { FormDataInterface } from '@/interface/profile';
import { useRouter } from 'next/navigation';


interface ProductRegistrationProps {
  onFormDataChange: (newFormData: FormDataInterface) => void;
  // 其他 prop 类型定义（如果有的话）
}

const ProductRegistration: React.FC<ProductRegistrationProps> = ({ onFormDataChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: RootState) => state.wallet.address);
  const [formData, setFormData] = useState<FormDataInterface>({
    logo: '',
    userName: '',
    description: '',
    website: '',
    twitter: '',
    other: '',
    personFlag: false,
    useEmail: '',
    userWallet: walletAddress,
    checkbox: false,
  });
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState<'error' | 'success' | null>('error');
  const router = useRouter();

  const connector = React.useRef<null | Uploader3Connector.Connector>(null);
  const [file, setFile] = React.useState<SelectedFile | UploadFile | UploadResult | CroppedFile | null>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      let data = postRegistration(formData);
      setAlertType('success')
      setAlertMessage('发布需求成功')
      setTimeout(() => {
        router.push('/profile')
      }, 1000)
    } catch (error) {
      setAlertType('error')
       if (error instanceof Error) {
        setAlertMessage(error.message); // 使用 error.message 而不是整个 error 对象
      } else {
        setAlertMessage('发生未知错误');
      }
    }
  };

  useEffect(() => {
    connector.current = createConnector('NFT.storage', {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5NzQ4ZGQyN0ZmOURmNzVFNDA3NjI5NkU4QzExQkMxNjdkQkE5RjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTA5Mzk4MTA0MSwibmFtZSI6ImJkMyJ9.tiOCtAu0MOfJBL8rbOzRYaFpx5wuBGpnHbo1cgT6gOc',
    });
  }, []);

  useEffect(() => {
    onFormDataChange(formData);
}, [formData]);

  return (
    <div className="p-6 border border-grey-100 rounded-lg flex flex-col gap-4">
      <h1 className="text-2xl font-bold">登记您的产品，开始合作</h1>

      <div className="">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>上传logo</label>
        <div className="flex items-end p-4">
          <Uploader3
            className="!flex items-end "
            connector={connector.current!}
            multiple={false}
            onChange={(files) => {
              setFile(files[0]);
            }}
            onUpload={(file) => {
              setFile(file);
            }}
            onComplete={(file) => {
              setFile(file);
              setFormData(prevFormData => {
                if (file.status === Uploader3FileStatus.done) {
                  console.log(1)
                  return {
                    ...prevFormData,
                    logo: file.url,
                  };
                } else {
                  return prevFormData;
                }
            });
            }}
            onCropCancel={(file) => {
              setFile(null);
            }}
            onCropEnd={(file) => {
              setFile(file);
            }}
          >
            <div className="rounded-lg bg-white border border-grey-100 w-16 h-16 flex items-center justify-center">
              {
                (formData && formData.logo) ? <Image src={formData.logo} alt={'avatar'} width={40} height={40}></Image> : <span>+</span>
              }
            </div>
            <span className="ml-4 text-sm">支持svg/jpg/png格式</span>
          </Uploader3>  
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span> 产品/品牌名字</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>一句话描述</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={6}
          className="w-full p-2 rounded border"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>网站</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold"><span className='text-red-500'>*</span>twitter</label>
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 flex items-center text-sm font-bold">其他</label>
        <input
          type="text"
          name="other"
          value={formData.other}
          onChange={handleInputChange}
          className="w-full p-2 rounded-full border"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={e => setFormData(prev => ({ ...prev, checkbox: e.target.checked }))}
        />
        <label className="ml-2">确保您填写的信息真实有效</label>
      </div>

      <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-full">
        完成登记
      </button>
    </div>
  );
};

export default ProductRegistration;
