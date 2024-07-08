const ITMES = [
  { title: "Dark & light theme toggle", status: true },
  { title: "Designing database schema", status: true },
  { title: "Integration of Prisma, Supabase", status: true },
  {
    title: "Fully functional authentication with protected route",
    status: true,
  },
  { title: "Display the products", status: true },
  { title: "Display all available orders", status: true },
  { title: "Fully functional search bar", status: true },
  {
    title:
      "Fully functional filter (By: Category, Subcategory, Availability, Price range)",
    status: true,
  },
  {
    title:
      "Fully functional sorting (By: Price low to high / high to low, Newest)",
    status: false,
  },
  { title: "Single page product", status: false },
  { title: "Fully functional cart component", status: false },
  { title: "Way to make an order", status: false },
  {
    title: "Way to create new product with img cloud service integration",
    status: false,
  },
  { title: "Display order in real time with notification", status: false },
  {
    title: "Corn job: Make a request to database server every 3 day",
    status: false,
  },
  { title: "Make real project from this template", status: false },
  //   { title: "", status: false },
]
const Progress = () => {
  return (
    <ul>
      {ITMES.map((item, key) => (
        <li key={key} className="flex items-center gap-2">
          <input
            defaultChecked={item.status}
            disabled={item.status}
            type="checkbox"
            id={key.toString()}
          />
          <label
            htmlFor={key.toString()}
            className={item.status ? "line-through opacity-50" : ""}
          >
            {item.title}
          </label>
        </li>
      ))}
    </ul>
  )
}

export default Progress
