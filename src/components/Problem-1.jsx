/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const [tasks, setTasks] = useState([]);

  const [sortedTasks, setSortedTasks] = useState(tasks);

  const handleFormData = (e) => {
    const value =
      e.target.name === "status"
        ? e.target.value.toLowerCase()
        : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  useEffect(() => {
    const sors = sortTask();
    setSortedTasks(sors);
    setTasks(sors);
  }, [tasks]);

  const handleAddTask = () => {
    setTasks([...tasks, formData]);
    setSortedTasks([...sortedTasks, formData]);
    setFormData({
      name: "",
      status: "",
    });
  };

  const filterTask = (val) => {
    switch (val) {
      case "active":
        return tasks.filter((task) => task.status.toLowerCase() === "active");

      case "completed":
        return tasks.filter(
          (task) => task.status.toLowerCase() === "completed"
        );

      default:
        return tasks;
    }
  };

  const handleClick = (val) => {
    setShow(val);
    const data = filterTask(val);
    setSortedTasks(data);
  };

  const sortTask = () => {
    const tsk = tasks.sort((a, b) => {
      if (a.status === b.status) {
        return 0;
      }

      if (
        a.status === "active" ||
        (a.status === "completed" && b.status !== "active")
      ) {
        return -1;
      }

      return 1;
    });

    return tsk;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormData}
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleFormData}
                className="form-control"
                placeholder="Status"
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
