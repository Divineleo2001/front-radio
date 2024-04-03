import { Button } from "@/components/ui/button";
import { TransformUnitData } from "@/schema/units";
import { deleteUnitAction } from "@/server_actions/actions/units";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const columns: ColumnDef<TransformUnitData>[] = [
  {
    accessorKey: "Index",
    header: () => (
      <div className="flex justify-center">
        <h1>Index</h1>
      </div>
    ),
    cell: (info) => {
      return <div className="flex justify-center">{info.row.index + 1}</div>;
    },
  },
  { accessorKey: "name", header: "Name" ,cell:(info)=>{
    return <div className="flex justify-center">{info.row.original.name}</div>
  }},
  {accessorKey:"id",
header:()=>(<div className="flex justify-center invisible md:visible">
    <h1>Id</h1>
</div>),
cell :(info)=>{
    return(
        <div className="flex justify-center invisible md:visible">
            {info.row.original.id}
        </div>
    )
}},
{
    accessorKey:"empServiceName",
    header:"Unit Service",
},
{accessorKey:"actions",
header:()=>(<div className="flex justify-center">
    <h1>Actions</h1>
</div>),
cell:({row})=>{
    const pathname=usePathname();
    const basePath=pathname.includes("units")
    ?pathname
    :pathname+"/units/";
    const unit=row.original;
    return(
        <div className="flex gap-2 justify-center">
            <Button variant={"link"} asChild>
                <Link href={basePath+"/"+unit.id}>Edit</Link>
            </Button>
            <Button 
            onClick={()=>deleteUnitAction(unit.id)}
            variant={"destructive"}
            >
                Delete
            </Button>
        </div>
    );
}}
];
