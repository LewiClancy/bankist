export interface AccountOwner {
  id: string;
  firstName: string;
  surname: string;
  displayImage: string;
  email: string;
  accountId: string;
  dateOfBirth: {
    seconds: number;
    nanoseconds: number;
  };
}
