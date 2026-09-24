#include <stdio.h>
struct student
{
    int id;
    char name[100];
    float marks;
    int members;
};
int main()
{
    struct student s;
    FILE *fp = fopen("student.dat", "ab");

    if (fp == NULL)
    {
        printf("file not opened ");
        return 1;
    }

    fread(&s, sizeof(s), 1, fp);
    printf("enter members :: ");
    scanf("%d", &s.members);
    printf("data inserted sucessfully \n");
    fclose(fp);

    return 0;
}