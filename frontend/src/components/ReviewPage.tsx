import StarReview from '@/components/StarReview'


const ReviewPage = () => {
  
  return (
    <>
      <main className="grid grid-cols-1">
        <title className="grid justify-center mb-10">
          {/* [id.Title] placeholder for the attraction */}
          <h1 className="font-extrabold mb-6 bg-clip-text max-sm:text-4xl max-md:text-6xl md:text-7xl text-center">
            Tivoli Gardens
          </h1>
          {/* {id.Region}, {id.Country} */}
          <h2 className="font-bold mb-2 bg-clip-text max-sm:text-lg max-md:text-xl md:text-2xl text-center">
            Copenhagen, Denmark
          </h2>
        </title>
        {/* Ratings placed below both picture and description */}
        <section className="grid grid-cols-1 md:grid-cols-2 ">
          {/* [id.picture] */}
          <div className="max-w-sm px-3 max-md:mx-auto md: ml-auto">
            <img src="src/assets/images/browse/tivoliDenmark.jpg" className="w-full h-auto" />
            <p className="font-semibold mt-8">Rating: </p>
            <StarReview
              userRating={2}
              handleStarClick={function (rating: number): void {
                throw new Error('Function not implemented.')
              }}
            />
          </div>

          {/* {id.Description} */}
          <div className='ml-2 px-3 max-md:mt-5'>
            <p>
              A magical tivoli in Copenhagen Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
              quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium
              nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum
              debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
              sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime
              adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
              quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi
              iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime
              doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas,
              hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores
              labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt
              esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga.
              Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
export default ReviewPage
