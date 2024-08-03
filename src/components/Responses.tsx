interface ResponsesProps {
  responders?: string[]
}

const Responses = ({ responders }: ResponsesProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">
        Responses ({responders?.length}/{responders?.length})
      </h3>
      <ul>
        {responders?.map((responders, index) => (
          <li key={index}>{responders}</li>
        ))}
      </ul>
    </div>
  )
}

export default Responses
