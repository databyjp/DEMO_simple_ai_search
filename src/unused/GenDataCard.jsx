const GenDataCard = ({title="", body="", uuid="", category=""}) => {
  return (
    <>
      <div>
        <div className="card my-2">
          <div className="card-body">
            <div className="card-text">
              {body}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default GenDataCard;
