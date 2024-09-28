import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import TableHeading from "@/Components/TableHeading";

const Index = ({ auth, projects, queryParams = null }) => {
     queryParams = queryParams || {};
     const searchFieldChange = (name, value) => {
          if (value) {
               queryParams[nmae] = value;
          } else {
               delete queryParams[name];
          }

          router.get(route('project.index'), queryParams)
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

          router.get(route('project.index'), queryParams)

     }

     return (
          /**
               <pre>
               {JSON.stringify(projects, undefined, 2)}
               </pre>
           */
          <AuthenticatedLayout
               user={auth.user}
               header={
                   <div className="flex justify-between items-center">
                     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                         Projects
                    </h2>
                    <Link 
                    href={route("project.create")}
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                    Add new
                    </Link>
                   </div>
               }
          >
               <Head title="Projects" />
               <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                         <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                              <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                                       <th className="px-3 py-3">
                                                            <TextInput
                                                                 className="w-full"
                                                                 defaultValue={queryParams.name}
                                                                 placeholder="Project Name"
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
                                                  {projects.data.map(
                                                       (project, index) => (
                                                            <tr
                                                                 key={index}
                                                                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                            >
                                                                 <td className="px-3 py-2">
                                                                      {project.id}
                                                                 </td>
                                                                 <td className="px-3 py-2">
                                                                      <img
                                                                           src={
                                                                                project.image_path
                                                                           }
                                                                           alt="mullah"
                                                                           style={{
                                                                                width: "50px",
                                                                           }}
                                                                      />
                                                                 </td>
                                                                 <th className="px-3 py-2 text-gray text-nowrap hover:underline ">
                                                                     <Link href={route('project.show', project.id)}> {project.name}</Link>
                                                                 </th>
                                                                 <td className="px-3 py-2">
                                                                      <span
                                                                           className={
                                                                                "px-2 py-1 rounded text-white " +
                                                                                PROJECT_STATUS_CLASS_MAP[
                                                                                project
                                                                                     .status
                                                                                ]
                                                                           }
                                                                      >
                                                                           {
                                                                                PROJECT_STATUS_TEXT_MAP[
                                                                                project
                                                                                     .status
                                                                                ]
                                                                           }
                                                                      </span>
                                                                 </td>
                                                                 <td className="px-3 py-2 text-nowrap">
                                                                      {
                                                                           project.created_at
                                                                      }
                                                                 </td>
                                                                 <td className="px-3 py-2 text-nowrap">
                                                                      {
                                                                           project.due_date
                                                                      }
                                                                 </td>
                                                                 <td className="px-3 py-2">
                                                                      {
                                                                           project
                                                                                .createdBy
                                                                                .name
                                                                      }
                                                                 </td>
                                                                 <td className="px-3 py-2">
                                                                      <Link
                                                                           href={route(
                                                                                "project.edit",
                                                                                project.id
                                                                           )}
                                                                           className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                                      >
                                                                           Edit
                                                                      </Link>
                                                                      <Link
                                                                           href={route(
                                                                                "project.destroy",
                                                                                project.id
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

                                   <Pagination links={projects.meta.links} />
                              </div>
                         </div>
                    </div>
               </div>
          </AuthenticatedLayout>
     );
};

export default Index;
