#include <stdio.h>
struct Student
{
    int id;
    // char name[50];
    // float marks;
};
int main()
{
    struct Student s;
    FILE *fp = fopen("student.dat", "rb");
    if (fp == NULL)
    {
        printf("File cannot be opened\n");
        return 1;
    }
    fread(&s, sizeof(s), 1, fp);
    printf("student id ::%d\n", s.id);
    // printf("student name ::%s\n", s.name);
    // printf("student marks ::%f\n", s.marks);
    fclose(fp);
    return 0;
}