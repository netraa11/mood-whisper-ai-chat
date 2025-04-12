
const testimonials = [
  {
    quote: "MoodChat.io has been a game-changer for managing my anxiety. Being able to express myself and get supportive responses helps me see things more clearly.",
    name: "Jamie L.",
    title: "Marketing Professional"
  },
  {
    quote: "As someone who lives alone, having a space to process my thoughts with AI personas based on supportive friends has been incredibly helpful for my mental wellbeing.",
    name: "Alex T.",
    title: "Software Engineer"
  },
  {
    quote: "I was skeptical at first, but the personalized responses really do feel like talking to someone who understands me. It's helped me through some tough times.",
    name: "Morgan K.",
    title: "Graduate Student"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            MoodChat.io has helped thousands of people process emotions and find clarity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border p-6 rounded-xl shadow-sm"
            >
              <div className="mb-6 text-primary">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <p className="text-foreground/80 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-foreground/60 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
