import Card from "../components/Card";

enum ContentType {
  YouTube = "youtube",
  Twitter = "twitter",
}

const Posts = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Card
        title="Future Projects"
        link="https://www.youtube.com/watch?v=q9-grPkV-Gw"
        tags={["productivity", "ideas"]}
        type={ContentType.YouTube}
      />

      <Card
        title="Future Projects"
        link="https://x.com/Ayudhika1310/status/1934632755574518229?ref_src=twsrc%5Etfw"
        tags={["productivity", "ideas"]}
        type={ContentType.Twitter}
      />

      <Card
        title="Future Projects"
        link="https://x.com/mannupaaji/status/1938196255320281118"
        tags={["productivity", "ideas"]}
        type={ContentType.Twitter}
      />
    </div>
  );
};

export default Posts;
