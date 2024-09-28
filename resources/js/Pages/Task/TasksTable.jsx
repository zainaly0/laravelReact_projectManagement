import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react"

export default function TasksTable({ tasks, queryParams=null, hideProejctColumn = false}) {
    queryParams = queryParams || {};
    const searchFieldChange = (name, value) => {
        if (value) {
             queryParams[nmae] = value;
        } else {
             delete queryParams[name];
        }

        router.get(route('task.index'), queryParams)
   };

   const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChange(name, e.target.value);
   };

   const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
             if (queryParams.sort_direction == 'asc') {
                  queryParams.sort_direction = 'desc'
             } else {
                  queryParams.sort_direction = 'asc'
             }

        } else {
             queryParams.sort_field = name;
             queryParams.sort_direction = 'asc'
        }

        router.get(route('task.index'), queryParams)

   }


    return (
        <>
            <div className='overflow-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-gray500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                ID
                            </TableHeading>
                            <th className="px-3 py-3">
                                Image
                            </th>
                            { !hideProejctColumn && <th className="px-3 py-3">
                                Project Name
                            </th>}
                            <TableHeading name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                Name
                            </TableHeading>
                            <TableHeading name="status" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                Status
                            </TableHeading>
                            <TableHeading name="created_at" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                Create Date
                            </TableHeading>
                            <TableHeading name="due_date" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                Due Date
                            </TableHeading>
                            <th className="px-3 py-3">
                                created By
                            </th>
                            <th className="px-3 py-3 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            { !hideProejctColumn && <th className="px-3 py-3"></th>}
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Task Name"
                                    onBlur={(e) =>
                                        searchFieldChange(
                                            "name",
                                            e.target
                                                .value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress(
                                            "name",
                                            e
                                        )
                                    }
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChange(
                                            "status"
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="">Pending</option>
                                    <option value="">In Progress</option>
                                    <option value="">Complete</option>

                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(
                            (task, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-3 py-2">
                                        {task.id}
                                    </td>
                                    <td className="px-3 py-2">
                                        <img
                                            src={
                                                task.image_path
                                            }
                                            alt="mullah"
                                            style={{
                                                width: "50px",
                                            }}
                                        />
                                    </td>
                                  {!hideProejctColumn &&  <td className="px-3 py-2">
                                        {task.project.name}
                                    </td> }
                                    <td className="px-3 py-2">
                                        {task.name}
                                    </td>
                                    <td className="px-3 py-2">
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-white " +
                                                TASK_STATUS_TEXT_MAP[
                                                task
                                                    .status
                                                ]
                                            }
                                        >
                                            {
                                                TASK_STATUS_TEXT_MAP[
                                                task
                                                    .status
                                                ]
                                            }
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">
                                        {
                                            task.created_at
                                        }
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">
                                        {
                                            task.due_date
                                        }
                                    </td>
                                    <td className="px-3 py-2">
                                        {
                                            task
                                                .createdBy
                                                .name
                                        }
                                    </td>
                                    <td className="px-3 py-2">
                                        <Link
                                            href={route(
                                                "task.edit",
                                                task.id
                                            )}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route(
                                                "task.destroy",
                                                task.id
                                            )}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={tasks.meta.links} />
        </>
    )
}