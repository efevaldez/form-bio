function capitalize(str: string): string {
  return (
    str
      ?.replaceAll("_", " ")
      .split(" ")
      .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join(" ") || ""
  );
}

export default capitalize;
