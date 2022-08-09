// import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { DoubleLeftOutlined, DoubleRightOutlined, SlidersOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Upload } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../App.css'
import '../components/imagesHover/imageHover.css'
import { getOriginalTemplate } from '../services/getApi';
import EmailChips from '../components/emailchips'
import '../components/buttongradients/buttongradients.css'
import { postLetter, uploadImages } from '../services/postApi';
import { getImageUrl } from '../services/getApi';
import Copyurl from '../components/copyurl';
import Uploadimage1 from '../components/uploadimage1';
import elements from '../icons/elements.svg'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const { Sider, Content } = Layout;



export default function Drawerl() {
  const [collapsed, setCollapsed] = useState(false);



  const onChange = (key) => {
    console.log(key);
  };

  const editorRef = useRef(null);
  const [images, setImages] = useState([])
  const [uploadImage, setUploadImage] = useState([]);
  const [value, setValue] = useState(``)
  const [chipsvalue, setChipsValue] = useState({
    val: "",
    chips: []
  })

  useEffect(() => {
    refreshRecords();
    getOriginalTemplate().then(res => { setValue(res.data.data.template_code); console.log(res); }).catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (!uploadImage.length) return;
    uploadImages(uploadImage)
      .then((res) => { console.log(res.data); setImages(res.data.data) })
      .catch(e => console.log(e));
    setUploadImage([]);

  }, [uploadImage])

  const refreshRecords = async () => {
    try {
      const { data } = await getImageUrl();
      setImages(data.data);
    } catch (e) { console.log(e); }
  }

  const log = () => {
    if (editorRef.current) {
      setValue(editorRef.current.getContent())
    }
  };

  const sendLetter = async (value, emails) => {
    await postLetter(value, emails).then(res => { console.log(res) }).catch(err => { console.log(err) })
  }


  const handleChange = (e) => {
    setChipsValue((prev) => ({ ...prev, val: e.target.value }))
  }
  const handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      var chip = chipsvalue.val;
      setChipsValue((pre) => ({
        ...pre,
        val: "",
        chips: [...pre.chips, chip]
      }))
    }
  }
  const handleDelete = (toBeRemoved) => {
    setChipsValue({
      chips: chipsvalue.chips.filter(email => email !== toBeRemoved)
    });
  };
  // ____________________________________



  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth='0' width='300'
          style={{ width: '', background: 'white', }}>
          {/* <div className="logo" >bbjnjks
        {/* <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
         
        /> */}
          {/* </div >  */}
          {/* <div style={{ position: 'absolute', width: '21.25rem', display: 'flex', flexDirection: 'column', margin: '5px' }}> */}

            {/* <button className="gradient-button gradient-button-4" style={{ width: "auto" }} onClick={log}>Save Template</button>
          <EmailChips chipsvalue={chipsvalue} setChipsValue={setChipsValue} handleDelete={handleDelete} handleKeyDown={handleKeyDown} handleChange={handleChange} />

          <button
            className="gradient-button gradient-button"
            onClick={() => { sendLetter(value, chipsvalue.chips) }} style={{ width: "auto", padding: '5px', color:'GrayText' }}

          >Send</button> */}



            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', height: '82.9vh', borderRadius: '10px', overflowY: 'auto', position: 'relative', backgroundColor: '#E5E5E5', gap: '3px' }} >

              <div className='tabs-nav' style={{ width: "18.5rem" }}>

                <Tabs onChange={onChange} type="card">
                  <TabPane tab={
                    <text style={{ display: "flex", flexDirection: "column-reverse" }}>
                      Template
                      <svg xmlns="http://www.w3.org/2000/svg" width="2.25rem" height="24" viewBox="0 0 5 24">
                        <path fill="currentColor"
                          d="M19.5 10V5a.5.5 0 0 0-.5-.5h-4.5V10h5zm0 1.5h-5v8H19a.5.5 0 0 0 .5-.5v-7.5zm-6.5-7H5a.5.5 0 0 0-.5.5v14c0 .28.22.5.5.5h8v-15zM5
       3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2z"></path>
                      </svg></text>
                  } key="1">
                    Content of Tab Pane 1
                  </TabPane>
                  <TabPane tab={
                    <text style={{ display: "flex", flexDirection: "column-reverse" }}>
                      Template
                      <svg viewBox="64 64 896 896" focusable="false" data-icon="sliders" width="1.5em" height="1.5em" fill="currentColor"
                        aria-hidden="true" style={{ position: "relative", left: "15px" }}>
                        <path d="M320 224h-66v-56c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v56h-66c-4.4 0-8 3.6-8 8v560c0 4.4
3.6 8 8 8h66v56c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8v-56h66c4.4 0 8-3.6 8-8V232c0-4.4-3.6-8-8-8zm-60 
508h-80V292h80v440zm644-436h-66v-96c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v96h-66c-4.4 0-8 3.6-8 8v416c0 
4.4 3.6 8 8 8h66v96c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8v-96h66c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8zm-60 
364h-80V364h80v296zM612 404h-66V232c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v172h-66c-4.4 0-8 3.6-8 8v200c0 
4.4 3.6 8 8 8h66v172c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8V620h66c4.4 0 8-3.6 8-8V412c0-4.4-3.6-8-8-8zm-60 
145a3 3 0 01-3 3h-74a3 3 0 01-3-3v-74a3 3 0 013-3h74a3 3 0 013 3v74z"></path>
                      </svg>
                    </text>
                  }
                    key="2">
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab={
                    <text style={{ display: "flex", flexDirection: "column-reverse" }}>
                      Upload Image
                      <svg xmlns="http://www.w3.org/2000/svg" width="2.25rem" height="24" viewBox="0 0 24 24" style={{ position: "relative", left: "25px" }}><path fill="currentColor"
                        d="M12.75 13.81v7.44a.75.75 0 1 1-1.5 0v-7.4L9.49 15.6a.75.75 0 1 1-1.06-1.06l2.35-2.36c.68-.68 1.8-.68 2.48
0l2.35 2.36a.75.75 0 1 1-1.06 1.06l-1.8-1.8zM9 18v1.5H6.75v-.01A5.63 5.63 0 0 1 5.01 8.66a6 6 0 0 1 11.94-.4 
5.63 5.63 0 0 1 .3 11.23v.01H15V18h1.88a4.12 4.12 0 1 0-1.5-7.97A4.51 4.51 0 0 0 11 4.5a4.5 4.5 0 0 0-4.43 5.29 
4.13 4.13 0 0 0 .68 8.2V18H9z"></path></svg>
                    </text>
                  } key="3">
                   {/* <Uploadimage1 setUploadImage={setUploadImage} uploadImage={uploadImage} /> */}

                   <Upload {...uploadImage}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
                  </TabPane>
                </Tabs>
              </div>









              {/* {images.map((image, index) => (
                <div key={index} style={{ borderRadius: '10px', position: 'relative', height: '150px', width: '100px', margin: '3px' }} >
                  <img class="imgHover" src={image.image} alt="" style={{ height: '100%', width: '100%', objectFit: 'strech', borderRadius: '10px' }} />
                  <Copyurl image={image.image} />

                </div>
              ))} */}

            </div>

          {/* </div> */}

        </Sider>

        <Content
          className="site-layout-background"
          style={{
            margin: '0px 0px',
            padding: 0,
            minHeight: 280,
          }}
        >
          <div style={{ position: '', display: '', margin: '0px', height: '600px', width: '100%' }}>


            <Editor
              apiKey='cm0s5oticy0ahny0l3o0pdpyionk5z8jvftdcnjmp4p0py4y'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ innerHeight: '100px', display: '', justifyContent: '' }}
              init={{
                selector: '.texteditor',
                plugins: "advlist lists table paste textcolor fullscreen colorpicker tabfocus link preview autolink image charmap image code",
                toolbar: `undo redo table fontsizeselect bold italic underline forecolor backcolor bullist numlist link blocks charmap fontselect alignleft aligncenter alignright alignjustify outdent indent removeformat image media code insertdatetime preview link image`,
                imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage",
                paste_data_images: true,
                menubar: true,
                toolbar_items_size: 'large',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                convert_newlines_to_brs: false,
                statusbar: false,
                relative_urls: false,
                remove_script_host: false,
                language: 'en',

              }}
            />
            <div style={{ position: 'relative', margin: '-340px 0px ', zIndex: '9000' }}> {React.createElement(collapsed ? DoubleRightOutlined : DoubleLeftOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            </div>
          </div>
        </Content>
      </Layout>
      {/* </Layout> */}
      
    </>
  )
}
