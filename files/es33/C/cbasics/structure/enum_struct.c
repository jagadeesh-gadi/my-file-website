// program to stroe and display the data of strcutures using and enum
// print student details should contain:
// student name ,student id ,student department and aslo define enum for department

#include <stdio.h>
enum dep
{
    CSE = 1,
    ECE,
    IT,
    EEE,
    MECH,
    CIVIL
};
typedef struct

{
    int id;
    char name[20];
    enum dep d;
} student_t;

int main()
{

    int n, i;
    scanf("%d", &n);
    student_t s[n];

    for (i = 0; i < n; i++)
    {
        printf("\nenter student details :: %d\n", i + 1);
        scanf("%d", &s[i].id);
        scanf("%s", s[i].name);
        scanf("%u", &s[i].d);
    }
    printf("\n ======== student details ======== \n");
    for (int i = 0; i < n; i++)
    {

        printf("\nstduent details :: %d\n", i + 1);
        printf("student id :: %d\n", s[i].id);
        printf("student id :: %s\n", s[i].name);
        switch (s[i].d)
        {
        case 1:
            printf("dep :: CSE\n");
            break;
        case 2:
            printf("dep :: ECE\n");
            break;
        case 3:
            printf("dep :: IT\n");
            break;
        case 4:
            printf("dep :: EEE\n");
            break;
        case 5:
            printf("dep :: MECH\n");
            break;
        case 6:
            printf("dep :: CIVIL\n");
            break;

        default:
            break;
        }
    }
    return 0;
}