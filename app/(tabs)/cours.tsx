import { Redirect } from "expo-router";

/** L’onglet Cours ouvre la liste complète (progression + quiz). */
export default function CoursTab() {
  return <Redirect href="/cours" />;
}
