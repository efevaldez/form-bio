import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";


export const loginAuth= {
    providers: [
  AzureADProvider({
    clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
    clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
    tenantId: `${process.env.AZURE_AD_TENANT_ID}`,
  }),
],
debug: true,
callbacks: {
  async signIn({ user, account }) {
    if (account.provider === "azure-ad") {
      const adminList = ["j.modugno@biosidus.com.ar",
         "a.blanco@biosidus.com.ar", 
         "a.caillet@biosidus.com.ar" ,
          "v.rocchetti@biosidus.com.ar",
        "d.tricoli@biosidus.com.ar",
         "m.hernandez@biosidus.com.ar", 
         "f.valdez@biosidus.com.ar"
      ];
      return adminList.includes(user.email);
    }
    return true; 
  }}
}

export default NextAuth(loginAuth);


