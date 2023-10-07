const ObjCard = ({title="", body="", uuid=""}) => {
  const id_displayed = "ID: " + uuid
  return (
    <>
      <div>
        <div class="card my-2">
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <span class="badge rounded-pill text-bg-light text-secondary">{id_displayed}</span>
            <p class="card-text">
              {body} &nbsp;&nbsp;<span class="badge bg-secondary"><a href="#" class="text-white">Read more</a></span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ObjCard;