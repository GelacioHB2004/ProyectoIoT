import React, { useEffect, useState } from 'react';
import { Table, message, Spin } from 'antd'; 
import { UserOutlined, CrownOutlined } from '@ant-design/icons'; 

const RolesF = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://backendiot-h632.onrender.com/api/roles');
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
        message.error('Error al cargar los usuarios'); 
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div style={styles.errorMessage}>Error: {error}</div>;
  }

  const columns = [
    {
      title: <span style={styles.headerTitle}> Nombre</span>,
      dataIndex: 'nombre',
      key: 'nombre',
      align: 'center',
    },
    {
      title: <span style={styles.headerTitle}> Apellido Paterno</span>,
      dataIndex: 'apellidopa',
      key: 'apellidopa',
      align: 'center',
    },
    {
      title: <span style={styles.headerTitle}> Apellido Materno</span>,
      dataIndex: 'apellidoma',
      key: 'apellidoma',
      align: 'center',
    },
    {
      title: <span style={styles.headerTitle}> Correo Electrónico</span>,
      dataIndex: 'gmail',
      key: 'gmail',
      align: 'center',
    },
    {
      title: <span style={styles.headerTitle}> Usuario</span>,
      dataIndex: 'user',
      key: 'user',
      align: 'center',
    },
    {
      title: <span style={styles.headerTitle}> Teléfono</span>,
      dataIndex: 'telefono',
      key: 'telefono',
      align: 'center',
    },
    {
      title: <span style={styles.headerTitle}> Tipo</span>,
      dataIndex: 'tipo',
      key: 'tipo',
      align: 'center',
      render: (tipo) => (
        <span style={{ display: 'flex', alignItems: 'center', color: tipo === 'Cliente' ? '#3f8600' : '#faad14', fontWeight: 'bold' }}>
          {tipo === 'Cliente' ? <UserOutlined style={{ marginRight: '8px' }} /> : <CrownOutlined style={{ marginRight: '8px' }} />}
          {tipo}
        </span>
      ),
    },
    {
      title: <span style={styles.headerTitle}> Módulos de Acceso</span>,
      dataIndex: 'modulos',
      key: 'modulos',
      align: 'center',
    },
  ];

  const rowClassName = (record) => {
    return record.tipo === 'Cliente' ? 'cliente-row' : 'administrativo-row';
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Usuarios y Roles</h2>
      <div style={styles.tableContainer}>
        <Table
          dataSource={usuarios}
          columns={columns}
          rowKey="id"
          rowClassName={rowClassName}
          pagination={false} 
          bordered 
          style={styles.table} 
          scroll={{ x: 'max-content' }} 
        />
      </div>
      <style>{`
       
        .container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
       
        .title {
          font-size: 2rem;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }
        
       
        .loadingContainer {
          text-align: center;
          padding: 50px 0;
        }
        
       
        .errorMessage {
          text-align: center;
          font-size: 1.2rem;
          color: #ff4d4f;
        }
        
       
        .headerTitle {
          display: flex;
          align-items: center;
          color: #000; 
          font-weight: bold;
        }
        
       
        .table {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 20px; 
        }

        
        .tableContainer {
          padding-bottom: 50px; 
        }
        
        
        .cliente-row {
          background-color: rgba(63, 134, 0, 0.1);
        }
        
        .administrativo-row {
          background-color: rgba(250, 173, 20, 0.1);
        }
        
        
        .ant-table-header {
          background-color: #1890ff; 
        }
        
        .ant-table-header-column {
          color: #000; 
          font-weight: bold; 
          padding: 16px; 
        }
        
        .ant-table-header > tr > th {
          background-color: #1890ff; 
          color: #000; 
          font-weight: bold; 
        }
        
        .ant-table-cell {
          border-bottom: 1px solid #e8e8e8; 
        }
        
        .ant-table-row:hover {
          background-color: #f0f5ff; 
        }
        

        @media (max-width: 1024px) {
          .title {
            font-size: 1.8rem;
          }
        
          .headerTitle {
            font-size: 1rem;
          }
        
          .ant-table-header > tr > th,
          .ant-table-cell {
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
        
          .title {
            font-size: 1.5rem;
          }
        
          .headerTitle {
            font-size: 0.9rem;
          }
        
          .ant-table-header > tr > th,
          .ant-table-cell {
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .title {
            font-size: 1.2rem;
          }
        
          .headerTitle {
            font-size: 0.8rem;
          }
        
          .ant-table-header > tr > th,
          .ant-table-cell {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '50px 0',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ff4d4f',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    color: '#000', 
    fontWeight: 'bold',
  },
  tableContainer: {
    paddingBottom: '50px', 
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '20px', 
  },
};

export default RolesF;
