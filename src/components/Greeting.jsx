function Greeting() {
  const userName = 'Михаил';
  const currentHour = new Date().getHours();

  let timeOfDay;
  if (currentHour < 12) {
    timeOfDay = 'Доброе утро';
  } else if (currentHour < 18) {
    timeOfDay = 'Добрый день';
  } else {
    timeOfDay = 'Добрый вечер';
  }

  return (
    <div className="greeting">
      <h2>{timeOfDay}, {userName}!</h2>
      <p>Рады видеть вас в нашем приложении.</p>
    </div>
  );
}

export default Greeting;