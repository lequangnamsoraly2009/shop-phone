import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainQuestionProduct from "./components/mainQuestion";
import ShowQuestionProduct from "./components/showQuestion";


function QuestionProductPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainQuestionProduct} />
      <Route path={`${match.url}/show/:id`} component={ShowQuestionProduct} />
    </Switch>
  );
}

export default QuestionProductPage;
