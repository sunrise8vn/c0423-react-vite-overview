import React, { useEffect, useState } from 'react';

const UseEffectWithDependencies = () => {
  const [person, setPerson] = useState({
    name: 'CodeGym',
    age: 10,
    courses: [],
    class: {
      id: 1,
    },
  });

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');

  const handleChangeCourse = (e) => {
    const course = e.target.value;
    setCourse(course);
  };

  const handleClickAdd = () => {
    const courseArr = person.courses;
    courseArr.push(course);

    // const obj = person.class;
    // obj.id = course;

    setPerson({
      ...person,
      courses: courseArr,
    });

    console.log(person);
  };

  useEffect(() => {
    const random = Math.trunc(Math.random() * 1000);
    setTitle(random);
  }, [person.class]);

  return (
    <>
      <h1>{title}</h1>
      <p>{person.name}</p>
      <p>{person.age}</p>
      <hr />
      <input type="text" onChange={handleChangeCourse} />
      <button onClick={handleClickAdd}>Add</button>
      <hr />
      <ul>
        {person.courses.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
};

export default UseEffectWithDependencies;
