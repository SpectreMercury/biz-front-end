import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnector, type Uploader3Connector } from '@lxdao/uploader3-connector';

const connector = createConnector('NFT.storage', { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5NzQ4ZGQyN0ZmOURmNzVFNDA3NjI5NkU4QzExQkMxNjdkQkE5RjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTA5Mzk4MTA0MSwibmFtZSI6ImJkMyJ9.tiOCtAu0MOfJBL8rbOzRYaFpx5wuBGpnHbo1cgT6gOc' });
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = <Uploader3Connector.PostImageFile>req.body;
  let { data: imageData = '', type } = reqBody;
 
  if (!imageData) {
    res.status(400).json({ error: 'No image data' });
    return;
  }
 
  if (!type) {
    res.status(400).json({ error: 'No image type' });
    return;
  }
 
  if (imageData.startsWith('data:image/')) {
    imageData = imageData.replace(/^data:image\/\w+;base64,/, '');
  }
 
  const buffer = Buffer.from(imageData, 'base64');
 
  // if buffer size > 2MB throw error
  // or other your own logic
  if (buffer.byteLength > 2 * 1024 * 1024) {
    res.status(500).json({ error: 'file size > 2MB' });
    return;
  }
 
  const result = await connector.postImage({ data: imageData, type }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
 
  if (result) {
    res.status(200).json({ url: result.url });
  }
};