export interface AccountOwner {
  id: string;
  firstName: string;
  surname: string;
  displayImage: string | undefined;
  email: string;
  accountId: string;
  dateOfBirth: {
    seconds: number;
    nanoseconds: number;
  };
}
