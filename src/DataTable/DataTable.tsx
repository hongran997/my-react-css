import './DataTable.css';
import styles from './DataTable.module.css';


const DataTable = ({ data }: { data: any[] }) => {
  return (
    <div className={styles.tableContainer}>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, index: number) => (
              <tr key={index}>
                <td className="data-cell">
                  <div className="cell-content">

                    {row.id}
                  </div>
                </td>
                <td className="data-cell">
                  <div className="cell-content">
                    {row.name}
                  </div>
                </td>
                <td className="data-cell">
                  <div className="cell-content">
                    ${row.price}
                  </div>
                </td>
                <td className="data-cell">
                  <div className="cell-content">
                    {row.category}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable; 